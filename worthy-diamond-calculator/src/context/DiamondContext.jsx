import { createContext, useContext, useEffect, useReducer } from "react";
import { estimatePrice, fetchMeta, fetchSimilar } from "../lib/api";

const DiamondContext = createContext(null);

const initialState = {
  form: {
    carat: 1.01,
    cut: "Very Good",
    color: "G",
    clarity: "VS1",
  },
  meta: { cuts: [], colors: [], clarities: [] },
  price: null,
  priceLoading: false,
  priceError: null,
  similar: {
    open: false,
    loading: false,
    target: null,
    items: [],
    error: null,
  },
};

function diamondReducer(state, action) {
  switch (action.type) {
    case "META_SUCCESS":
      return { ...state, meta: action.payload };
    case "UPDATE_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    case "PRICE_REQUEST":
      return {
        ...state,
        priceLoading: true,
        priceError: null,
      };

    case "PRICE_SUCCESS":
      return {
        ...state,
        priceLoading: false,
        price: action.price,
      };

    case "PRICE_FAILURE":
      return {
        ...state,
        priceLoading: false,
        priceError: action.error,
      };

    case "SIMILAR_OPEN_REQUEST":
      return {
        ...state,
        similar: {
          ...state.similar,
          open: true,
          loading: true,
          error: null,
          items: [],
        },
      };

    case "SIMILAR_SUCCESS":
      return {
        ...state,
        similar: {
          ...state.similar,
          loading: false,
          target: action.target,
          items: action.items,
        },
      };

    case "SIMILAR_FAILURE":
      return {
        ...state,
        similar: {
          ...state.similar,
          loading: false,
          error: action.error,
        },
      };

    case "SIMILAR_CLOSE":
      return {
        ...state,
        similar: {
          ...state.similar,
          open: false,
        },
      };

    default:
      return state;
  }
}

export function DiamondProvider({ children }) {
  const [state, dispatch] = useReducer(diamondReducer, initialState);

  const { form } = state;

  function updateField(field, value) {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }

  useEffect(() => {
    let cancelled = false;

    async function run() {
      dispatch({ type: "PRICE_REQUEST" });
      try {
        const { price } = await estimatePrice(form);
        if (!cancelled) {
          dispatch({ type: "PRICE_SUCCESS", price });
        }
      } catch (err) {
        if (!cancelled) {
          dispatch({
            type: "PRICE_FAILURE",
            error: err.message || "Failed to estimate price",
          });
        }
      }
    }

    if (form.carat && form.carat > 0) {
      run();
    } else {
      dispatch({ type: "PRICE_SUCCESS", price: null });
    }

    return () => {
      cancelled = true;
    };
  }, [form.carat, form.cut, form.color, form.clarity]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMeta();
        dispatch({ type: "META_SUCCESS", payload: data });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function openSimilar() {
    dispatch({ type: "SIMILAR_OPEN_REQUEST" });
    try {
      const { target, items } = await fetchSimilar(form);
      dispatch({ type: "SIMILAR_SUCCESS", target, items });
    } catch (err) {
      dispatch({
        type: "SIMILAR_FAILURE",
        error: err.message || "Failed to load similar diamonds",
      });
    }
  }

  function closeSimilar() {
    dispatch({ type: "SIMILAR_CLOSE" });
  }

  const value = {
    form: state.form,
    price: state.price,
    priceLoading: state.priceLoading,
    priceError: state.priceError,
    similarState: state.similar,
    meta: state.meta,
    updateField,
    openSimilar,
    closeSimilar,
  };

  return (
    <DiamondContext.Provider value={value}>
      {children}
    </DiamondContext.Provider>
  );
}

export function useDiamond() {
  const ctx = useContext(DiamondContext);
  if (!ctx) throw new Error("useDiamond must be used within DiamondProvider");
  return ctx;
}

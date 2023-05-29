const toastErrorConfig = {
  icon: "👎",
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
};

const toastSuccessConfig = {
  icon: "✅",
  style: { ...toastErrorConfig.style },
};

export { toastErrorConfig, toastSuccessConfig };

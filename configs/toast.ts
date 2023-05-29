const toastErrorConfig = {
  icon: "👎",
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
  duration: 2000,
};

const toastSuccessConfig = {
  icon: "✅",
  style: { ...toastErrorConfig.style },
  duration: 2000,
};

export { toastErrorConfig, toastSuccessConfig };

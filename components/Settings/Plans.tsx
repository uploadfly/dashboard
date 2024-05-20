import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React from "react";

const Plans = () => {
  const { fly } = useFlyStore();
  const { user } = useUserStore();

  const plans = [
    {
      name: "Basic",
      price: 5,
      features: [
        "20 GB of storage",
        "10,000 monthly uploads",
        "1 GB max upload size",
        "Email support",
        "Private files (soon)",
        "Custom domain (soon)",
        "Webhooks (soon)",
      ],
      checkout_url: `${process.env.NEXT_PUBLIC_LEMON_BASIC_URL}`,
    },
    {
      name: "Pro",
      price: 20,
      features: [
        "100 GB of storage",
        "100,000 monthly uploads",
        "5 GB max upload size",
        "Priority email support",
        "Private files (soon)",
        "Custom domain (soon)",
        "Webhooks (soon)",
      ],
      checkout_url: `${process.env.NEXT_PUBLIC_LEMON_PRO_URL}`,
    },
  ];

  const openCustomerPotal = () => {
    window.open("https://uploadfly.lemonsqueezy.com/billing");
  };

  const openCheckout = (checkout_url: string) => {
    const checkoutUrl = `${checkout_url}?checkout[email]=${user?.email}&checkout[custom][user_id]=${user?.id}&checkout[custom][project_id]=${fly?.id}`;

    window.location.href = checkoutUrl;
  };

  return (
    <div className="flex gap-10 flex-wrap lg:flex-nowrap">
      {plans.map((plan, i) => (
        <div className="w-full" key={i}>
          <div className="border-2 relative flex flex-col rounded-3xl p-5 border-uf-accent">
            {fly?.name === "pro" && (
              <div className="absolute -top-3 bg-uf-accent text-white rounded-full px-10 py-1 text-sm font-semibold -translate-x-1/2 left-1/2 transform">
                {plan.name}
              </div>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <h1 className="mt-3 font-semibold text-gray-400">
              <span className="font-normal text-4xl text-white">
                ${plan.price}
              </span>
              /month
            </h1>
            {plan.features.map((feature) => (
              <div key={feature} className="mt-5">
                <span className="flex gap-2 items-center">
                  <BsFillCheckCircleFill className="text-uf-accent" />
                  {feature}
                </span>
              </div>
            ))}
            <button
              onClick={() =>
                fly.plan === plan.name.toLowerCase()
                  ? openCustomerPotal()
                  : openCheckout(plan.checkout_url)
              }
              className="flex gap-2 bg-uf-accent/95 hover:bg-uf-accent text-uf-light mt-10 rounded-md py-2 max-w-sm w-full items-center justify-center font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user?.id || !fly.id}
            >
              {fly.plan === plan.name.toLowerCase()
                ? "Manage plan"
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;

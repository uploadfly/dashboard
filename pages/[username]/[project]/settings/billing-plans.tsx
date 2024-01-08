import Plans from "@/components/Settings/Plans";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import Head from "next/head";

const BillingAndPlans = () => {
  const { user } = useUserStore();
  const { fly } = useFlyStore();

  const openCheckout = () => {
    const checkoutUrl = `${process.env.NEXT_PUBLIC_LEMON_PRO_URL}?checkout[email]=${user?.email}&checkout[custom][user_id]=${user?.id}&checkout[custom][project_id]=${fly?.id}`;

    window.open(checkoutUrl);
  };

  const openCustomerPotal = () => {
    window.open("https://uploadfly.lemonsqueezy.com/billing", "_blank");
  };

  return (
    <SettingsLayout>
      <Head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </Head>
      <div className="w-full">
        <Plans
          plan={fly.plan}
          button={
            <button
              onClick={fly.plan === "free" ? openCheckout : openCustomerPotal}
              className="flex gap-2 bg-uf-accent text-uf-light mt-10 rounded-md py-2 w-[380px] items-center justify-center font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {fly.plan === "free" ? "Upgrade to Pro" : "Manage Plan"}
            </button>
          }
        />
      </div>
    </SettingsLayout>
  );
};

export default BillingAndPlans;

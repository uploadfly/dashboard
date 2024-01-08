import Plans from "@/components/Settings/Plans";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import Head from "next/head";

const BillingAndPlans = () => {
  const { user } = useUserStore();
  const { fly } = useFlyStore();

  const openCheckout = () => {
    const checkoutUrl = `https://uploadfly.lemonsqueezy.com/checkout/buy/1c8a1972-9b91-49b8-a30e-c147eadc27f0?checkout[email]=${user?.email}&checkout[custom][user_id]=${user?.id}&checkout[custom][project_id]=${fly?.id}`;

    window.open(checkoutUrl, "_blank");
  };

  return (
    <SettingsLayout>
      <Head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </Head>
      <div className="w-full">
        {fly.plan === "free" && (
          <Plans
            button={
              <button
                onClick={openCheckout}
                className="flex gap-2 bg-uf-accent text-uf-light mt-10 rounded-md py-2 w-[380px] items-center justify-center font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upgrade to Pro
              </button>
            }
          />
        )}
        {fly.plan === "pro" && <p>You are on the Pro plan</p>}
      </div>
    </SettingsLayout>
  );
};

export default BillingAndPlans;

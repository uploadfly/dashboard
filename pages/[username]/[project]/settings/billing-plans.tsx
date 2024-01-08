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
      <h1>Biiling and Plans</h1>

      <button onClick={openCheckout}>Upgrade to pro</button>
    </SettingsLayout>
  );
};

export default BillingAndPlans;

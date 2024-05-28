import Plans from "@/components/Settings/Plans";
import SettingsLayout from "@/layouts/SettingsLayout";
import Head from "next/head";

const BillingAndPlans = () => {
  return (
    <SettingsLayout>
      <Head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </Head>
      <div className="w-full">
        <Plans />
      </div>
    </SettingsLayout>
  );
};

export default BillingAndPlans;

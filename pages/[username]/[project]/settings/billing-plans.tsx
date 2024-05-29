import Plans from "@/components/Settings/Plans";
import SettingsLayout from "@/layouts/SettingsLayout";
import Script from "next/script";

const BillingAndPlans = () => {
  return (
    <SettingsLayout>
      <div className="w-full">
        <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer></Script>
        <Plans />
      </div>
    </SettingsLayout>
  );
};

export default BillingAndPlans;

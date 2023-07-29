import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/configs/axios";

const Log = () => {
  const { fly } = useFlyStore();
  const router = useRouter();
  const [log, setLog] = useState({});
  useEffect(() => {
    if (router.query.log_id) {
      (async () => {
        const log_id = router.query.log_id;

        const { data } = await axios(
          `/log?log_id=${log_id}&fly_id=${fly.uuid}`
        );
        console.log(data);
      })();
    }
  }, [router.query.log_id]);

  return <DashboardLayout pageName="Log Details">deets</DashboardLayout>;
};

export default Log;

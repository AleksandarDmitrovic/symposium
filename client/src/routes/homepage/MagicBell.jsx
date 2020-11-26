import React from "react";
import ReactDOM from "react-dom";
import MagicBell, { FloatingNotificationInbox } from "@magicbell/magicbell-react";

const theme = {"icon":{"borderColor":"#6113A3","width":"24px"},"unseenBadge":{"backgroundColor":"#DF4759"},"header":{"backgroundColor":"#6113A3","textColor":"#ffffff","borderRadius":"16px"},"footer":{"backgroundColor":"#6113A3","textColor":"#ffffff","borderRadius":"16px"},"notification":{"default":{"textColor":"#15091F","borderRadius":"8px","backgroundColor":"#6113A3"},"unseen":{"backgroundColor":"#6113A3"},"unread":{"backgroundColor":"#6113A3"}}};


export default function NotificationBell(props) {

  return (
    <MagicBell
    apiKey="fec4160f9f74148d5f8852c02e51108035b82993"
    userEmail="aleksandar.dmitrovic@gmail.com"
    theme={theme}
  >
    {(props) => <FloatingNotificationInbox width={400} height={500} {...props} />}
  </MagicBell>
  );
};

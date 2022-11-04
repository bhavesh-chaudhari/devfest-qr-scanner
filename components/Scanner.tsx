import React, { useState } from "react";
import styles from "../styles/Scanner.module.css";
import dynamic from "next/dynamic";

const QrReader = dynamic(
  () => {
    return import("react-qr-reader").then((mod) => mod.QrReader);
  },
  {
    ssr: false,
  }
);

const Scanner = () => {
  const [data, setData] = useState("No result");
  const [ticketId, setTicketId] = useState<null | string>(null)

  return (
    <div className={styles["container"]}>
      <div className={styles["scanner"]}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              console.log(result);
              setData(result.getText());
              const head = result.getText().indexOf("Ticket id: ") + 11;
              const tail = result.getText().length
              const ticket_id = result.getText().substring(head, tail + 1)
              setTicketId(ticket_id)
              alert(`Ticket id: ${ticket_id}`);
            }
          }}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={styles["result"]}>{data}</div>
      <div className={styles["ticket-id"]}>
        <p>{ticketId ? ticketId : "Ticket id will be here"}</p>
      </div>
    </div>
  );
};

export default Scanner;

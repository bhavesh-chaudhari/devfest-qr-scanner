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
  const [ticketId, setTicketId] = useState<null | string>(null);

  return (
    <div className={styles["container"]}>
      <div className={styles["scanner"]}>
        <QrReader
          onResult={async (result, error) => {
            if (!!result) {
              console.log(result);
              setData(result.getText());
              const head =
                result.getText().indexOf("Ticket id: ") === -1
                  ? result.getText().indexOf("ticket id: ") + 11
                  : result.getText().indexOf("Ticket id: ") + 11;
              if (head === -1) {
                return alert("Inavlid Ticket");
              }
              const tail = result.getText().length;
              const ticket_id = result.getText().substring(head, result.getText().indexOf("Ticket id: ") === -1 ? tail - 1: tail + 1) ;
              setTicketId(ticket_id.trim());
              alert(`Ticket id: ${ticket_id.trim()}`);

              const id = ticket_id

              const res = await fetch(
                `https://devfest2022tickets.scattrhq.repl.co/api/v1/counter_api`,
                {
                  method: "POST",
                  body: JSON.stringify({ id }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = res.json()

              console.log(data)
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

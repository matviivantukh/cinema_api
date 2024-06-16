import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { getAllSessionSeats } from "../../../store/actions/session-seat-actions";
import { getAllViewers } from "../../../store/actions/viewer-actions";
import { getAllPaymentTypes } from "../../../store/actions/payment-type-actions";

import Select from "../../../UI/Select";

import classes from "./SessionSeatsModal.module.css";

const SessionSeatsModal = ({ sessionId, onClose }) => {
  const { sessionSeats } = useSelector((state) => state.sessionSeats);
  const { paymentTypes } = useSelector((state) => state.paymentTypes);
  const { viewers } = useSelector((state) => state.viewers);
  const dispatch = useDispatch();
  const [selectedViewerId, setSelectedViewerId] = useState(null);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  useEffect(() => {
    dispatch(getAllSessionSeats(sessionId));
    dispatch(getAllViewers());
    dispatch(getAllPaymentTypes());
  }, [sessionId]);

  const handleAddClick = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        viewerId: selectedViewerId,
        totalSum,
        paymentTypeId: selectedPaymentTypeId,
        tickets: selectedSeatIds.map((sessionSeatId) => ({
          sessionSeatId,
        })),
      }),
    });
    onClose();
  };

  const [rowsCount, numbersInRowCount] = useMemo(
    () =>
      sessionSeats.reduce(
        (accum, sessionSeat) => {
          let [row, numberInRow] = accum;
          if (row < sessionSeat.seat.seat_row) {
            row = sessionSeat.seat.seat_row;
          }
          if (numberInRow < sessionSeat.seat.seat_number) {
            numberInRow = sessionSeat.seat.seat_number;
          }
          return [row, numberInRow];
        },
        [0, 0]
      ),
    [sessionSeats]
  );

  const totalSum = useMemo(
    () =>
      sessionSeats
        .filter((sessionSeat) =>
          selectedSeatIds.includes(sessionSeat.session_seat_id)
        )
        .reduce((acc, sessionSeat) => acc + sessionSeat.price, 0),
    [selectedSeatIds, sessionSeats]
  );

  return (
    <div className={classes["modal"]}>
      <div className={classes["hall-container"]}>
        <div className={classes["hall-screen"]}>
          <span>Screen</span>
        </div>
        <div
          className={classes["hall-plan"]}
          style={{
            gridTemplateColumns: `repeat(${numbersInRowCount}, auto)`,
            gridTemplateRows: `repeat(${rowsCount}, auto)`,
          }}
        >
          {sessionSeats.map((sessionSeat) => (
            <div
              style={{
                gridRow: sessionSeat.seat.seat_row,
                gridColumn: sessionSeat.seat.seat_number,
              }}
              className={`${classes["seat"]} ${
                sessionSeat.ticket ? classes["selected"] : ""
              } ${
                selectedSeatIds.includes(sessionSeat.session_seat_id)
                  ? classes["marked"]
                  : ""
              }`}
              onClick={() => {
                if (sessionSeat.ticket) {
                  return;
                }
                setSelectedSeatIds((prev) => {
                  if (prev.includes(sessionSeat.session_seat_id)) {
                    return prev.filter(
                      (id) => id !== sessionSeat.session_seat_id
                    );
                  }
                  return [...prev, sessionSeat.session_seat_id];
                });
              }}
            ></div>
          ))}
        </div>
      </div>
      <form className={classes["form"]} onSubmit={handleAddClick}>
        <Select
          className={classes["select"]}
          label={"Select viewer"}
          options={viewers.map((viewer) => ({
            label: viewer.name,
            value: viewer.viewer_id,
          }))}
          onChange={(viewerId) => {
            setSelectedViewerId(viewerId);
          }}
        />
        <Select
          className={classes["select"]}
          label={"Select payment type"}
          options={paymentTypes.map((paymentType) => ({
            label: paymentType.payment_type_name,
            value: paymentType.payment_type_id,
          }))}
          onChange={(paymentTypeId) => {
            setSelectedPaymentTypeId(paymentTypeId);
          }}
        />
        <ul className={classes["tickets"]}>
          {sessionSeats
            .filter((sessionSeat) =>
              selectedSeatIds.includes(sessionSeat.session_seat_id)
            )
            .map((sessionSeat) => (
              <li key={sessionSeat.session_seat_id}>
                <span>Row: {sessionSeat.seat.seat_row}</span>
                <span>Seat number: {sessionSeat.seat.seat_number}</span>
                <span>${sessionSeat.price}</span>
              </li>
            ))}
        </ul>
        <p>Total: ${totalSum}</p>
        <div className={classes["actions"]}>
          <button onClick={onClose}>Close</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default SessionSeatsModal;

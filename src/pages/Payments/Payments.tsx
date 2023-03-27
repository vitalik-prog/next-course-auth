import PaymentsForm from "../../components/PaymentsForm/PaymentsForm";
import classes from "./css/Payments.module.css";

const Payments = () => {
  return (
    <section className={classes.payments}>
      <h1>Your User Payments</h1>
      <PaymentsForm />
    </section>
  );
};

export default Payments;

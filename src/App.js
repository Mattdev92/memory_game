import React from "react";
import Car from "./components/Car";
import Audi from "./assets/audi.svg";
import BMW from "./assets/bmw.svg";
import Chevrolet from "./assets/chevrolet.svg";
import Mercedes from "./assets/mercedes-benz.svg";
import Opel from "./assets/opel.svg";
import Volksw from "./assets/volkswagen.svg";
import { connect } from "react-redux";
import { startClicked } from "./actions";
import styles from "./App.module.scss";
import "bulma";
const carArray = [
  Audi,
  BMW,
  Chevrolet,
  Mercedes,
  Opel,
  Volksw,
  Audi,
  BMW,
  Chevrolet,
  Mercedes,
  Opel,
  Volksw,
];
const sortedCarArray = carArray.sort(() => Math.random() - 0.5);
const carId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
class App extends React.Component {
  handleReload() {
    window.location.reload(true);
  }
  render() {
    const { startClicked, start, pairedArray, startTimeStamp } = this.props;
    return (
      <>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              pairedArray.length !== 6 && startClicked();
              pairedArray.length === 6 && this.handleReload();
            }}
            class="button is-success is-medium"
          >
            {start
              ? pairedArray.length === 6
                ? "PLAY AGAIN"
                : "Good Luck"
              : "PLAY"}
          </button>
        </div>

        <div id={styles.App}>
          {sortedCarArray.map((carBrand, i) => (
            <Car carBrand={carBrand} carId={carId[i]} key={carId[i]} />
          ))}
        </div>
        {pairedArray.length === 6 && (
          <div className={styles.grats}>
            SUPER ! YOUR TIME: {(Date.now() - startTimeStamp) / 1000} s.
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { start, pairedArray, startTimeStamp } = state;
  return { start, pairedArray, startTimeStamp };
};

const mapDispatchToProps = (dispatch) => ({
  startClicked: () => dispatch(startClicked()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

import * as React from 'react';
import './Loader.css';
import Modal from "../common/Modal"

// class Loader extends React.Component {
//   render() {
//     return (
//       <div className="loader-container">
//         <div className="loader" />
//       </div>
//     );
//   }
// }

// export default Loader;

export default props => (
  <Modal open persist background={props.background || "gray"}>
    <div className="loader" />
  </Modal>
)
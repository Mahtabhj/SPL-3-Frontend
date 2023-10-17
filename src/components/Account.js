// import React, { useState } from "react";
// import {
//   Col,
//   Container, Row,
//   Tab
// } from "react-bootstrap";
// import CloudAccount from "./CloudAccount";
// import Header from "./Header";

// function Account() {
//   const [open, setOpen] = useState(false);
//   const [logsOpen, setLogsOpen] = useState(false);
//   const [wafrOpen, setWafrOpen] = useState(false);
//   return (
//     <div className="dashboard overflow-hidden">
//       <Container fluid>
//         <Header />
//         <Row className="py-3 px-4 account">
//           <Col md={12} >
//             <Tab.Container id="left-tabs-example" defaultActiveKey="cloud-accounts">
//               <Row>
//                 <Col sm={3}>
//                   {/* <p className="title py-3">Profile settings</p>
//                   <Nav variant="pills" className="flex-column py-3 rounded " style={{backgroundColor:"#ffffff"}}>
//                     <Nav.Item>
//                       <Nav.Link eventKey="cloud-accounts"><BsBox/>Cloud accounts</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link eventKey="second"><BsPeople/>Team members</Nav.Link>
//                     </Nav.Item>                                        
//                     <Nav.Item>
//                       <Nav.Link eventKey="third"><BsPerson/>My profile</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link eventKey="forth"><AiFillLock/>Change password</Nav.Link>
//                     </Nav.Item>
//                   </Nav> */}
                  
//                 </Col>
//                 <Col sm={9}>
//                   <Tab.Content>
//                     <Tab.Pane eventKey="cloud-accounts"><CloudAccount/></Tab.Pane>
//                     <Tab.Pane eventKey="second"></Tab.Pane>
//                   </Tab.Content>
//                 </Col>
//               </Row>
//             </Tab.Container>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Account;

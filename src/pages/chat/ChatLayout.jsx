import React from 'react';

import {Row, Col, Stack} from 'react-bootstrap';
import {Outlet} from "react-router-dom";
import ChatSideBar from "./_components/ChatSideBar";
import {Toaster} from "react-hot-toast";
import styled from "styled-components";
import Navbar from '../../Util/dashboardLayout/Navbar';

const RightCol = styled(Col)`
    border-left: 1px solid rgba(105, 43, 239, 0.2);
    padding: 16px;
    width:16%;
    @media (max-width: 768px) {
        display: none;
    }
`

function ChatLayout() {
    return (
        <div className='p-2 pb-0 pe-0 '>
        <div style={{ borderBottom: "1px solid rgba(105, 43, 239, 0.2)" }}>
        <div  className=' pb-2 pt-1  ms-3'>
        <Navbar width="98.3%" />

        {/* Other content within the div */}
      </div>
        
        </div>
   
 


      
            <Toaster/>
  
            <Row>
                <Col>
                    <Outlet/>
                </Col>
                <RightCol md={"2"} className={'d-none mb-2  d-lg-block'}>
                    <ChatSideBar/>
                </RightCol>
            </Row>
        </div>
    );
}

export default ChatLayout;
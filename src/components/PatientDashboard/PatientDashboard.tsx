import { Button, Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useContext, useEffect } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../states/app.context";
import PatientInfo from "./common/PatientInfo";
import {
  BuildOutlined,
  UnorderedListOutlined,
  ReconciliationOutlined
} from '@ant-design/icons';

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, getPatient, patient, checkIns, setCheckIns } = useContext(AppContext);

  const { pid } = useParams();
  const location=useLocation()
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  // const setCurrentPatient = async(id: string) => {
  //   const res = await findPatient(id);
  //   dispatch(selectPatient(res.data.patient));
  //   const insuranceRes = await findInsurance(res.data.patient.primaryInsurance);
  //   dispatch(setInsurance(insuranceRes.data.insurance));
  // }
useEffect(()=>{

  if(!checkIns){
    setCheckIns(true)
    console.log("enter");
    const createBtn=document.querySelector(".createCarePlan")  as HTMLButtonElement ;
    console.log(createBtn); 
    if(createBtn){
      createBtn.click()
    }
    // navigate(`/patient/${pid}/create-careplan`)

    // window.location.href=`/patient/${pid}/create-careplan`
  }
},[checkIns])

  const gotoPreviousPage = () => {
    console.log('going to prev page');
    navigate("/patient-list")
  }

  useEffect(() => {
    // setCurrentPatient(pid as string)
    getPatient(pid);
    if (loading) return;
    if (user?.email === undefined) {
      navigate("/login");
    }
  }, [pid]);

  return (
    <Layout hasSider>
      <Sider
        width={220}
        breakpoint="sm"
        collapsedWidth="1rem"
        style={{
          backgroundColor: "white",
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Button type="text" icon={ <BiArrowBack />} onClick={gotoPreviousPage}>
          Back
        </Button>
        <h1 style={{textAlign: 'center', height: '2rem'}}>{patient?.firstName} {patient?.lastName}</h1>

        <Menu mode="inline" theme="light" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to=""><ReconciliationOutlined /> &nbsp; Insurance</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="create-careplan" className="createCarePlan"> <BuildOutlined /> &nbsp; Create Care Plan</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="previous-care-plans"> <UnorderedListOutlined /> &nbsp; Previous Care Plan</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight: '100vh' }}>
          <PatientInfo />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PatientDashboard;

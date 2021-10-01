import Sidebar from "src/components/Sidebar";
import InitialAuth from "src/components/initalPropsAuth";

export function dashBoard({ jwt_resp }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }
  return (
    <>
      <Sidebar></Sidebar>
    </>
  );
}

dashBoard.getInitialProps = InitialAuth;

export default dashBoard;

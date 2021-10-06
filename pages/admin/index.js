import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import { adminAuth } from "src/components/authenticated";

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

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  return { props: { jwt_resp } };
}

export default dashBoard;

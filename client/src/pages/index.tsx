import Auth from "@/component/Auth";
import Chat from "@/component/Chat";
import { Box } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = (props) => {
  const { session: session } = props;

  const reloadSession = () => {
    window.location.reload()
    // const event  =  new Event("visibilitychange")
    // document.dispatchEvent(event)
    console.log("hey dispatch");
  };
  
  console.log(session);
  return (
    <Box>
      {session?.user.username ? (
        <Chat userSession={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
export default Home;
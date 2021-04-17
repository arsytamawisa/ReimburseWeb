import Header from "../Header";
import MenuHc from "../dashboardHc/MenuHc";
import Footer from "../Footer";
import DashboardContent from "./contents/ContentHc";


function RoutesHc() {
    return(
        <div>
            <Header/>
            <MenuHc />
            <DashboardContent/>
            <Footer />
        </div>
    )
}
export default RoutesHc
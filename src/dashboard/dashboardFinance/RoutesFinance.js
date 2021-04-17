import Header from "../Header";
import Footer from "../Footer";
import MenuFinance from "./MenuFinance";
import ContentFinance from "./ContentFinance";

function RoutesFinance() {
    return(
        <div>
            <Header/>
            <MenuFinance/>
            <ContentFinance />
            <Footer />
        </div>
    )
}
export default RoutesFinance
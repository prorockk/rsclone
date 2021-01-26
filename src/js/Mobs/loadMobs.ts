import Fly from "./fly";
import Gaper from "./gaper";
import Milligan from "./milligan";
import Potter from "./potter";
import Host from "./host";
import Clotty from "./clotty";
import Spotty from "./spotty";

let FlyClass: any;

const loadMobs = () => {
    FlyClass = new Fly();
    const GaperClass = new Gaper();
    const MilliganClass = new Milligan();
    const PotterClass = new Potter();
    const HostClass = new Host();
    const ClottyClass = new Clotty();
    const SpottyClass = new Spotty();
    FlyClass.doneLoading.call(FlyClass);
    GaperClass.doneLoading.call(GaperClass);
    MilliganClass.doneLoading.call(MilliganClass);
    PotterClass.doneLoading.call(PotterClass);
    HostClass.doneLoading.call(HostClass);
    ClottyClass.doneLoading.call(ClottyClass);
    SpottyClass.doneLoading.call(SpottyClass);
};
export { FlyClass };
export default loadMobs;

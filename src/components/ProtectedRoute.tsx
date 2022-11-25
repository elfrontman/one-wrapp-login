import { useContext, useEffect } from "react"
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from "../context/AuthedContext"

interface ProtectedRouteProps {
    component: React.ComponentType<any>,
    path: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component, path}) => {
    const context = useContext(AuthContext);

    useEffect(() => {
        console.log(`Loading protected route ${path} with component ${Component?.displayName}`);
    }, [Component, path]);

    return (
        <Component />
       /**<Route path={path} render={() => context.user != null ? <Component /> : <Redirect to="/login"/>} /> */ 
    )
}

export default ProtectedRoute
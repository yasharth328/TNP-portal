import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';

export { Layout };

function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            if(userService.userValue.role =="admin"){
                router.push('/admin');
            }else{
                router.push('/student');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex">
            {children}
        </div>
    );
}
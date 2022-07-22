import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Link } from '.';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ children, href, exact, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    
    if (isActive) {
        props.className += ' text-indigo-700';
    }

    return <Link href={href} {...props}>{children}</Link>;
}
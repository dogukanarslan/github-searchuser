export const CustomLink = ({
    navigate,
    component: Component,
    children,
    ...props
}) => {
    return <Component {...props}>{children}</Component>
}

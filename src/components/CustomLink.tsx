interface CustomLinkProps {
    navigate: any
    component: React.ElementType
    children: React.ReactNode
}

export const CustomLink = ({
    navigate,
    component: Component,
    children,
    ...props
}: CustomLinkProps) => {
    return <Component {...props}>{children}</Component>
}

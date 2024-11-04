interface BaseLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  [key: string]: any;
}

function BaseLayout({ children, ...rest }: BaseLayoutProps) {
  return (
    <div className="w-full h-[100vh] bg-white" {...rest}>
      {children}
    </div>
  );
}

export default BaseLayout;

interface BaseLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  [key: string]: any;
}

function BaseLayout({ children, ...rest }: BaseLayoutProps) {
  return (
    <div className="flex flex-col w-full h-screen bg-white" {...rest}>
      {children}
    </div>
  );
}

export default BaseLayout;

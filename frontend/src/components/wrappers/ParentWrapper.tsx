import "../../styling/main-background.css";
const ParentWrapper: React.FC<any> = ({ children }) => (
    <div className="relative min-h-screen bg-chalk text-umnyama w-full py-6">
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-2">
            {children}
        </div>
    </div>
);
export default ParentWrapper;
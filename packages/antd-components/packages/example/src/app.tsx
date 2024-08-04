import { AcDatePicker } from '@jswork/antd-components/src/main';
import '@jswork/antd-components/src/style.scss';
import { useEffect, useState } from 'react';

function App() {
  const [d1, setD1] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setD1('2024-08-08T00:00:00.000+08:00');
    }, 1000);
  }, []);
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <AcDatePicker value={d1} onChange={(e) => setD1(e.target.value)} />
    </div>
  );
}

export default App;

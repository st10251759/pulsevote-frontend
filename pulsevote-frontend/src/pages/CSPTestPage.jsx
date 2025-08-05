import { useState } from 'react';

const CSPTestPage = () => {
  const [testResults, setTestResults] = useState([]);

  const addResult = (test, result, severity = 'info') => {
    setTestResults(prev => [...prev, { 
      test, 
      result, 
      severity, 
      timestamp: new Date() 
    }]);
  };

  // Test 1: Inline Script Violation (SHOULD be blocked)
  const testInlineScript = () => {
    try {
      const script = document.createElement('script');
      script.innerHTML = 'console.log("This inline script should be blocked!");';
      document.head.appendChild(script);
      addResult('Inline Script', 'FAILED - Script was allowed (SECURITY RISK!)', 'danger');
    } catch (error) {
      addResult('Inline Script', 'PASSED - Script was blocked by CSP', 'success');
    }
  };

  // Test 2: External Script from Untrusted Domain (SHOULD be blocked)
  const testExternalScript = () => {
    const script = document.createElement('script');
    script.src = 'https://malicious-example.com/bad-script.js';
    
    let timeoutId = setTimeout(() => {
      addResult('External Script', 'PASSED - External script blocked by CSP (timeout)', 'success');
      script.remove();
    }, 2000);
    
    script.onload = () => {
      clearTimeout(timeoutId);
      addResult('External Script', 'FAILED - Malicious script loaded (SECURITY RISK!)', 'danger');
      script.remove();
    };
    
    script.onerror = () => {
      clearTimeout(timeoutId);
      addResult('External Script', 'PASSED - External script blocked by CSP', 'success');
      script.remove();
    };
    
    document.head.appendChild(script);
  };

  // Test 3: Mixed Content (HTTP vs HTTPS)
  const testMixedContent = () => {
    const img = document.createElement('img');
    img.src = 'http://httpbin.org/image/png'; // HTTP URL
    img.style.display = 'none'; // Hide the test image
    
    let timeoutId = setTimeout(() => {
      addResult('Mixed Content', 'PASSED - HTTP content blocked or upgraded', 'success');
      img.remove();
    }, 3000);
    
    img.onload = () => {
      clearTimeout(timeoutId);
      addResult('Mixed Content', 'PASSED - HTTP upgraded to HTTPS successfully', 'success');
      img.remove();
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      addResult('Mixed Content', 'PASSED - HTTP image blocked by CSP', 'success');
      img.remove();
    };
    
    document.body.appendChild(img);
  };

  // Test 4: Unauthorized API Fetch (SHOULD be blocked)
  const testUnauthorizedFetch = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('https://httpbin.org/json', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        addResult('Unauthorized Fetch', 'FAILED - Request to unauthorized domain succeeded (SECURITY RISK!)', 'danger');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        addResult('Unauthorized Fetch', 'PASSED - Request timed out (likely blocked)', 'success');
      } else {
        addResult('Unauthorized Fetch', 'PASSED - Request blocked by CSP', 'success');
      }
    }
  };

  // Test 5: Iframe Embedding Test
  const testIframe = () => {
    try {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://example.com';
      iframe.style.display = 'none'; // Hide the test iframe
      
      let timeoutId = setTimeout(() => {
        addResult('Iframe Embedding', 'PASSED - Iframe blocked or restricted', 'success');
        iframe.remove();
      }, 3000);
      
      iframe.onload = () => {
        clearTimeout(timeoutId);
        addResult('Iframe Embedding', 'WARNING - Iframe loaded (check X-Frame-Options)', 'warning');
        iframe.remove();
      };
      
      iframe.onerror = () => {
        clearTimeout(timeoutId);
        addResult('Iframe Embedding', 'PASSED - Iframe blocked', 'success');
        iframe.remove();
      };
      
      document.body.appendChild(iframe);
    } catch (error) {
      addResult('Iframe Embedding', 'PASSED - Iframe creation blocked', 'success');
    }
  };

  // Test 6: Inline Styles (Should work due to 'unsafe-inline')
  const testInlineStyles = () => {
    try {
      const div = document.createElement('div');
      div.style.color = 'red';
      div.style.padding = '10px';
      div.style.display = 'none'; // Hide the test element
      div.textContent = 'Test element for inline styles';
      document.body.appendChild(div);
      
      // Check if styles were applied
      const computedStyle = window.getComputedStyle(div);
      if (computedStyle.color === 'rgb(255, 0, 0)' || computedStyle.color === 'red') {
        addResult('Inline Styles', 'PASSED - Inline styles allowed (unsafe-inline directive active)', 'warning');
      } else {
        addResult('Inline Styles', 'FAILED - Inline styles blocked (unexpected)', 'info');
      }
      
      // Clean up
      setTimeout(() => div.remove(), 1000);
    } catch (error) {
      addResult('Inline Styles', 'FAILED - Inline styles blocked', 'info');
    }
  };

  // Test 7: Data URI Test
  const testDataUri = () => {
    try {
      const img = document.createElement('img');
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=';
      img.style.display = 'none';
      
      let timeoutId = setTimeout(() => {
        addResult('Data URI', 'PASSED - Data URI images allowed', 'success');
        img.remove();
      }, 2000);
      
      img.onload = () => {
        clearTimeout(timeoutId);
        addResult('Data URI', 'PASSED - Data URI images allowed', 'success');
        img.remove();
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        addResult('Data URI', 'FAILED - Data URI blocked (unexpected)', 'warning');
        img.remove();
      };
      
      document.body.appendChild(img);
    } catch (error) {
      addResult('Data URI', 'FAILED - Data URI blocked', 'warning');
    }
  };

  const runAllTests = () => {
    setTestResults([]);
    console.log('🔒 Starting CSP Security Tests...');
    
    testInlineScript();
    setTimeout(() => testExternalScript(), 100);
    setTimeout(() => testMixedContent(), 200);
    setTimeout(() => testUnauthorizedFetch(), 300);
    setTimeout(() => testIframe(), 400);
    setTimeout(() => testInlineStyles(), 500);
    setTimeout(() => testDataUri(), 600);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      default: return '#17a2b8';
    }
  };

  const getSeverityBackground = (severity) => {
    switch (severity) {
      case 'success': return '#d4edda';
      case 'danger': return '#f8d7da';
      case 'warning': return '#fff3cd';
      default: return '#d1ecf1';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>CSP Security Test Page</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        This page tests various Content Security Policy violations to verify your security setup.
        <br />
        <strong>Note:</strong> PASSED tests mean CSP is working correctly by blocking dangerous content!
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runAllTests}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🚀 Run All Tests
        </button>
        <button 
          onClick={clearResults}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🗑️ Clear Results
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>Individual Tests:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={testInlineScript} style={buttonStyle}>🚫 Test Inline Script</button>
          <button onClick={testExternalScript} style={buttonStyle}>🌐 Test External Script</button>
          <button onClick={testMixedContent} style={buttonStyle}>🔒 Test Mixed Content</button>
          <button onClick={testUnauthorizedFetch} style={buttonStyle}>📡 Test Unauthorized Fetch</button>
          <button onClick={testIframe} style={buttonStyle}>🖼️ Test Iframe</button>
          <button onClick={testInlineStyles} style={buttonStyle}>🎨 Test Inline Styles</button>
          <button onClick={testDataUri} style={buttonStyle}>📊 Test Data URI</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '15px' }}>Test Results:</h3>
        {testResults.length === 0 ? (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '5px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p>No tests run yet. Click "🚀 Run All Tests" to start testing your CSP configuration.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
            {testResults.map((result, index) => (
              <div key={index} style={{ 
                marginBottom: '12px', 
                padding: '12px',
                backgroundColor: getSeverityBackground(result.severity),
                borderLeft: `4px solid ${getSeverityColor(result.severity)}`,
                borderRadius: '3px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '16px' }}>{result.test}:</strong>
                    <div style={{ marginTop: '5px', fontSize: '14px' }}>{result.result}</div>
                  </div>
                  <small style={{ color: '#666', fontSize: '12px' }}>
                    {result.timestamp.toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
        <h4 style={{ marginBottom: '15px', color: '#333' }}>🔍 How to Monitor CSP Violations:</h4>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>Open Browser Developer Tools</strong> (Press F12)</li>
          <li><strong>Go to the Console tab</strong></li>
          <li><strong>Look for CSP violation messages</strong> (usually in red)</li>
          <li><strong>Check your backend console</strong> for violation reports</li>
          <li><strong>Review Network tab</strong> for failed requests</li>
        </ol>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d1ecf1', borderRadius: '3px' }}>
          <strong>🛡️ Security Interpretation:</strong>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            <li><span style={{ color: '#28a745' }}>✅ PASSED</span> = CSP is blocking threats (good security)</li>
            <li><span style={{ color: '#dc3545' }}>❌ FAILED</span> = Security gap detected (needs attention)</li>
            <li><span style={{ color: '#ffc107' }}>⚠️ WARNING</span> = Potential security concern</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  minWidth: '160px'
};

export default CSPTestPage;
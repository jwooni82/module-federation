export async function loadRemoteModule(remoteUrl, scope, module) {
    await new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-remote="${scope}"]`)) return resolve();
  
      const script = document.createElement('script');
      script.src = remoteUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-remote', scope);
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load remote script: ${remoteUrl}`));
      document.head.appendChild(script);
    });
  
    await __webpack_init_sharing__('default');
    const container = window[scope];
    if (!container) throw new Error(`Remote container "${scope}" not found on window`);
  
    try {
      await container.init(__webpack_share_scopes__.default);
    } catch (err) {
      console.warn(`[${scope}] already initialized or failed to init`, err);
    }
  
    let factory;
    try {
      factory = await container.get(module);
    } catch (err) {
      throw new Error(`Module "${module}" not found in remote "${scope}"`);
    }
  
    if (!factory) throw new Error(`Factory for module "${module}" is undefined`);
  
    const Module = factory();
    return Module;
  }
  
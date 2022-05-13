import { pushStateLocationPlugin, servicesPlugin, UIRouter } from '@uirouter/core';
import { Visualizer } from '@uirouter/visualizer';
import { naiveClearRenderedDom, naiveRenderIntoDom } from './render';

// Create the router
var router = new UIRouter();
window.router = router;

router.plugin(Visualizer);
router.plugin(pushStateLocationPlugin);
router.plugin(servicesPlugin);

// This transition hook renders each active states' html property
router.transitionService.onSuccess({}, (trans, state) => {
  trans.exiting().forEach(stateDef => naiveClearRenderedDom(stateDef));
  trans.entering().forEach(stateDef => naiveRenderIntoDom(stateDef));
});

// Register some sample states
router.stateRegistry.register({ name: 'state1', url: '/state1', html:  `<h1>This is state 1...</h1><ui-view id="state1"></ui-view>` });
router.stateRegistry.register({ name: 'state1.nest1', url: '/nest1', html: "This is a nestted state" });
router.stateRegistry.register({ name: 'state2', url: '/state2', html: "This is state 2..." });

// Start the router
router.trace.enable(1);
router.urlService.rules.initial({ state: 'state1.nest1' });
router.urlService.listen();
router.urlService.sync();

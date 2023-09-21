import { createMachine, assign } from "xstate";

interface Colors {
	red: number;
	orange: number;
	green: number;
}

interface Context {
	allCurrentLights: Colors;
	countDown: number | null;
}

export const TrafficMachine = createMachine<Context>({
	id: "lights",
	initial: "running",
	context: {
		allCurrentLights: {
			red: 1,
			orange: 0,
			green: 0,
		},
		countDown: 8,
	},
	states: {
		running: {
			on: {
				SELECT: {
					actions: assign((context, event) => {
						context.allCurrentLights = event.allCurrentLights;
						return {};
					}),
				},
				TIMER: {
					actions: assign((context, event) => {
						context.countDown = event.cntDown;
						return {};
					}),
				},
			},
		},
	},
});

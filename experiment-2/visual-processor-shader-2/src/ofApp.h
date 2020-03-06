#pragma once

#include "ofMain.h"
#include "ofxOsc.h"

// listening port
#define PORT 12345

// max number of strings to display
#define NUM_MSG_STRINGS 10

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
        
    // ================= Shader =================
    ofShader shader;
    ofPlanePrimitive plane;
    ofVideoPlayer video;
    // ================= Shader =================

    // ================== OSC ==================
    ofxOscReceiver receiver;
    int currentMsgString;
    string msgStrings[NUM_MSG_STRINGS];
    float timers[NUM_MSG_STRINGS];
    // ================== OSC ==================

    // ============= System Control =============
    float lastSwipeTime, lastLoopTime, stepLength, ySteps;
    int lastTimeStamp;
    bool isSwiping;
    vector<int> timeStamps;
    vector<int> deltaTimes;
    vector<float> speeds;
    vector<float> accumSpeed;
    // ============= System Control =============
};

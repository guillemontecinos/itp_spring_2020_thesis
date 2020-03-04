#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    #ifdef TARGET_OPENGLES
        shader.load("shadersES2/shader");
    #else
        if(ofIsGLProgrammableRenderer()){
            shader.load("shadersGL3/shader");
        }else{
            shader.load("shadersGL2/shader");
        }
    #endif
    
    img.allocate(80, 60, OF_IMAGE_GRAYSCALE);
    
    plane.set(800, 600, 80, 60);
    plane.mapTexCoordsFromTexture(img.getTexture());
}

//--------------------------------------------------------------
void ofApp::update(){
    float noiseScale = ofMap(ofClamp(mouseX, 0, ofGetWidth()), 0, ofGetWidth(), 0, 0.07);
    float noiseVel = ofGetElapsedTimef();
    
    ofPixels & pixels = img.getPixels();
    int w = img.getWidth();
    int h = img.getHeight();
    for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++) {
            int i = y * w + x;
            float noiseValue = ofNoise(x * noiseScale, y * noiseScale, noiseVel);
            pixels[i] = 255 * noiseValue;
        }
    }
    img.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
    img.getTexture().bind();
    shader.begin();
    ofPushMatrix();
    
    float tx = ofGetWidth() / 2;
    float ty = ofGetHeight() / 2;
    ofTranslate(tx, ty);
    
    shader.setUniform1f("scale", ofMap(mouseX, 0, ofGetWidth(), 0, 50));
    
//    float percentY = mouseY / (float)ofGetHeight();
//    float rotation = ofMap(percentY, 0, 1, -60, 60, true) + 60;
//    ofRotateDeg(rotation, 1, 0, 0);
    
    plane.draw();
    
    ofPopMatrix();
    shader.end();
    img.getTexture().unbind();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}

// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

// K refers to the surface's material
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

// I refers to the light properties
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform float specularPower = 32.0f;
uniform vec3 lightDirection; // = Lm
uniform vec3 lightPosition; // the new LM
uniform vec3 cameraPosition; // V surface to viewer/camera position

out vec4 FragColour;

void main() 
{
	//Normalize vec4 to vec3 to get world space
	vec3 normal = normalize(vNormal).xyz;
	//vec3 light = normalize(lightDirection);
	vec3 pos = normalize(vPosition).xyz;
	vec3 color = new vec3 (1,0,0);

	//Ambient Light, Ka = what kind of color, Ia = how bright the color is.
	vec3 lightPos = lightPosition - vec3(vPosition);
	vec3 lightP = normalize(lightPos);
	vec3 Ambient = normalize(Ka) * normalize(Ia);

	//Diffuse, Lights the sphere using it's normal and the light by dot product and returns one number (Always between 0 and 1)
	float NdL = max(0.0f, dot(normal, lightP));
	vec3 Diffuse = normalize(Kd) * normalize(Id) * NdL;

	//Specular, Light reflects from light normal upon sphere
	// r = d(light) - 2(d * n)n, n = normal and must be normalize

	// All these try to find reflection
	vec3 R = reflect(lightPos, normal); // Reflect light
	vec3 reflection = lightPos - 2 * dot(lightPos, normal) * normal;
	//vec3 halfwayVector = lightPos + normal;

	vec3 E = (cameraPosition - pos); //surface to eye
	vec3 halfwayVector = normalize(lightP + E);
	float specTerm = pow(max(0.0f, dot(halfwayVector, normal)), specularPower);
	vec3 Specular = normalize(Ks) * normalize(Is) * specTerm;

	FragColour = vec4((Ambient + Diffuse) * color + Specular,1);
}
// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

// K refers to the surface's material
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower = 32.0f;

// I refers to the light properties
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform vec3 lightDirection; // = Lm

uniform vec3 cameraPosition; // V surface to viewer/camera position

out vec4 FragColour;

void main() 
{
	//Normalize vec4 to vec3 to get world space
	vec3 normal = normalize(vNormal).xyz;
	vec3 light = normalize(lightDirection);
	vec3 pos = normalize(vPosition).xyz;
	vec3 color = new vec3 (1,0,0);

	vec3 Ambient = Ka * Ia * color;

	// Dot product
	//float NdL = vNormal.x * lightDirection.x + vNormal.y * lightDirection.y + vNormal.z * lightDirection.z + vNormal.w;
	float NdL = max(0.0f, dot(normal, light));

	vec3 Diffuse = Kd * Id * color * NdL;

	//Half way vector
	vec3 halfwayVector = light + normal;
	vec3 E = normalize(cameraPosition - pos);

	float specTerm = pow(min(0.0f, dot(halfwayVector, E)), specularPower);
	vec3 Specular = Ks * Is * specTerm;

	FragColour = vec4(Ambient + Diffuse + Specular,1);
}
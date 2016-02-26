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

uniform float specularPower = 2.0f;
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

	//Ambient Light
	vec3 Ambient = normalize(Ka) * normalize(Ia);

	//Diffuse
	// Dot product
	// Question for Matthew, what is the difference between because manually doing the dot product than using (dot), and also what does the max does?
	//float NdL = vNormal.x * lightDirection.x + vNormal.y * lightDirection.y + vNormal.z * lightDirection.z + vNormal.w;

	float NdL = max(0.0f, dot(normal, light));
	vec3 Diffuse = normalize(Kd) * normalize(Id) * NdL;

	//Specular
	// Question for Matthew, what does this relfect do?
	//vec3 R = reflect(light, normal); // Reflect light
	// r = d(light) - 2(d * n)n, n = normal and must be normalize

	vec3 reflection = light - 2 * dot(light, normal) * normal;
	vec3 halfwayVector = light + normal;
	vec3 E = normalize(cameraPosition - pos); //surface to eye
	float specTerm = pow(min(0.0f, dot(halfwayVector, E)), specularPower);
	vec3 Specular = normalize(Ks) * normalize(Is) * specTerm;

	FragColour = vec4((Ambient + Diffuse + Specular) * color,1);
}
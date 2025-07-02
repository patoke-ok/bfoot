import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Crear un servidor MCP
const server = new McpServer({
    name: "bfoot-server",
    version: "1.0.0"
});
// Herramienta de suma (ejemplo)
server.registerTool("add", {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
}, async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
}));
// Recurso de saludo dinámico (ejemplo)
server.registerResource("greeting", new ResourceTemplate("greeting://{name}", { list: undefined }), {
    title: "Greeting Resource",
    description: "Dynamic greeting generator"
}, async (uri, { name }) => ({
    contents: [{
            uri: uri.href,
            text: `Hello, ${name}!`
        }]
}));
// Inicializar el transporte por stdio y conectar el servidor
const transport = new StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map
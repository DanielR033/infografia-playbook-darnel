# Token de Fabric para la cuenta del cliente desde la caché MSAL del Azure CLI (no imprime nada más que el token).
import msal, os, sys
TENANT = os.environ["FABRIC_TENANT_ID"]   # tenant del cliente
USER = os.environ["FABRIC_USER"].lower()  # cuenta con rol en el workspace (la del az login)
scope = sys.argv[1] if len(sys.argv) > 1 else "https://api.fabric.microsoft.com/.default"
cache = msal.SerializableTokenCache()
path = os.path.expanduser("~/.azure/msal_token_cache.json")
cache.deserialize(open(path).read())
app = msal.PublicClientApplication("04b07795-8ddb-461a-bbee-02f9e1bf7b46", authority=f"https://login.microsoftonline.com/{TENANT}", token_cache=cache)
acc = [a for a in app.get_accounts() if a["username"].lower() == USER]
if not acc: sys.exit("cuenta no encontrada en la caché")
r = app.acquire_token_silent([scope], account=acc[0])
if not r or "access_token" not in r: sys.exit("sin token: " + str((r or {}).get("error_description", ""))[:200])
print(r["access_token"])

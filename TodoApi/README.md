# Todo API

A RESTful Web API built with .NET 8 that provides backend services for todo management. This API uses minimal APIs, Entity Framework Core, and SQL Server to deliver fast and efficient todo operations.

## 🚀 Features

- ✅ Full CRUD operations for todos (Create, Read, Update, Delete)
- 🗄️ SQL Server database with Entity Framework Core
- 📚 Swagger/OpenAPI documentation for easy testing
- 🌐 CORS enabled for frontend integration
- ⚡ Minimal APIs for lightweight and fast endpoints
- 🔧 .NET 8 with modern C# features.

## 🛠️ Tech Stack

- **Framework**: .NET 8
- **API Style**: Minimal APIs
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture principles

## 📋 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/todos` | Get all todos | None | `Todo[]` |
| `GET` | `/api/todos/{id}` | Get todo by ID | None | `Todo` |
| `POST` | `/api/todos` | Create new todo | `Todo` | `Todo` |
| `PUT` | `/api/todos/{id}` | Update existing todo | `Todo` | `Todo` |
| `DELETE` | `/api/todos/{id}` | Delete todo | None | `204 No Content` |

## 📊 Data Model

```csharp
public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
}
```

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- SQL Server (LocalDB, Express, or Full version)
- Visual Studio 2022 or VS Code with C# extension

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TodoApi
   ```

2. **Configure Database Connection:**
   Update the connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=dbName;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

3. **Install Dependencies:**
   ```bash
   dotnet restore
   ```

4. **Run Database Migrations:**
   ```bash
   dotnet ef database update
   ```
   *Note: If you don't have migrations yet, create them first:*
   ```bash
   dotnet ef migrations add InitialCreate
   ```

5. **Run the Application:**
   ```bash
   dotnet run
   ```

The API will be available at:
- HTTPS: `https://localhost:7xxx` (port varies)
- HTTP: `http://localhost:5xxx` (port varies)

## 📖 API Documentation

When running in development mode, Swagger UI is available at:
- `https://localhost:7xxx/swagger`

This provides an interactive interface to test all API endpoints.

## 🏗️ Project Structure

```
TodoApi/
├── Data/
│   ├── Todo.cs                 # Todo entity model
│   └── TodoDbContext.cs        # Entity Framework DbContext
├── Properties/
│   └── launchSettings.json     # Launch profiles
├── Program.cs                  # Main application entry point
├── appsettings.json           # Configuration settings
└── TodoApi.csproj             # Project file
```

## 🔧 Configuration

### CORS Configuration
The API is configured to allow all origins, methods, and headers for development. For production, configure specific allowed origins in `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
        .WithOrigins("https://yourdomain.com")
        .AllowAnyMethod()
        .AllowAnyHeader());
});
```

### Database Configuration
Update `appsettings.json` with your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your SQL Server Connection String"
  }
}
```

## 🧪 Testing the API

### Using Swagger UI
1. Run the application
2. Navigate to `/swagger`
3. Use the interactive interface to test endpoints

### Using curl
```bash
# Get all todos
curl -X GET "https://localhost:7xxx/api/todos"

# Create a new todo
curl -X POST "https://localhost:7xxx/api/todos" \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Todo","isCompleted":false,"dueDate":"2024-12-31T10:00:00Z"}'

# Update a todo
curl -X PUT "https://localhost:7xxx/api/todos/1" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Todo","isCompleted":true,"dueDate":"2024-12-31T10:00:00Z"}'

# Delete a todo
curl -X DELETE "https://localhost:7xxx/api/todos/1"
```

## 🛠️ Development

### Adding New Features
1. Update the `Todo` model in `Data/Todo.cs` if needed
2. Create new migrations: `dotnet ef migrations add <MigrationName>`
3. Add new endpoints in `Program.cs`
4. Update this README with new endpoint documentation

### Database Migrations
```bash
# Add a new migration
dotnet ef migrations add <MigrationName>

# Apply migrations
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove
```

## 🏭 Production Deployment

1. **Update Configuration:**
   - Set production connection string
   - Configure CORS for specific origins
   - Disable Swagger in production (already configured)

2. **Build for Production:**
   ```bash
   dotnet publish -c Release
   ```

3. **Deploy:**
   - Azure App Service
   - IIS
   - Docker container
   - Any hosting platform supporting .NET 8

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
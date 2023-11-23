using System.Data;
using Assignment.Core.Interface;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Assignment.Infrastructure.DBService;

public class DbService : IDbService
{
    private readonly IDbConnection _db;

    public DbService(IConfiguration configuration)
    {
        _db = new NpgsqlConnection(configuration.GetConnectionString("CollegeDB"));
    }

    public async Task<T?> GetAsync<T>(string command, object parms)
    {
        T result;
        result = (await _db.QueryAsync<T>(command, parms).ConfigureAwait(false)).FirstOrDefault();
        return result;
    }

    public async Task<List<T>> GetAll<T>(string command, object parms)
    {
        List<T> results = new List<T>();
        results = (await _db.QueryAsync<T>(command, parms)).ToList();
        return results;
    }

    public async Task<int> EditData(string command, object parms)
    {
        int result;
        result = await _db.ExecuteAsync(command, parms);
        return result;
    }
}
using Assignment.Core.Entity;
using Assignment.Core.Interface;

namespace Assignment.Domain.Service;

public class TodoService : ITodoService
{
    private readonly IDbService _dbService;

    public TodoService(IDbService dbService)
    {
        _dbService = dbService;
    }

    public async Task<List<Todo>> GetAll()
    {
        var result = await _dbService.GetAll<Todo>("SELECT * FROM public.todo", new { });
        return result;
    }

    public async Task<Todo> GetById(int id)
    {
        var result = await _dbService.GetAsync<Todo>("SELECT * FROM public.todo WHERE id=@id", new { id });
        return result;
    }

    public async Task<bool> AddTodo(Todo todo)
    {
        var result = await _dbService.EditData(
            "INSERT INTO public.todo (id,title,description,status) VALUES (@Id, @Title, @Description, @Status)",
            todo
        );
        return true;
    }

    public async Task<bool> EditTodo(Todo todo)
    {
        var result = await _dbService.EditData(
            "UPDATE public.todo SET title=@Title, description=@Description, status=@Status WHERE id=@Id",
            todo
        );
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var result = await _dbService.EditData("DELETE FROM public.todo WHERE id=@id",new {id});
        return true;
    }
}
using Assignment.Core.Entity;

namespace Assignment.Core.Interface;

public interface ITodoService
{
    Task<List<Todo>> GetAll();
    Task<Todo> GetById(int id);
    Task<bool> AddTodo(Todo todo);
    Task<bool> EditTodo(Todo todo);
    Task<bool> Delete(int id);
}
using Assignment.Core.Entity;
using Assignment.Core.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitectureDemo.Controllers;

[ApiController]
[Route("api/todo")]


public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var res = await _todoService.GetAll();
        return Ok(res);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
        {
            return BadRequest("Enter valid Id");
        }
        var res = await _todoService.GetById(id);
        if (res == null)
        {
            return NotFound($"Todo is not found in id {id}");
        }
        return Ok(res);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Insert([FromBody] Todo todo)
    {
        var result = await _todoService.AddTodo(todo);
        return Ok(result);
    }

    [HttpPut("edit")]
    public async Task<IActionResult> Edit([FromBody] Todo todo)
    {
        var result = await _todoService.EditTodo(todo);
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0)
        {
            return BadRequest("Enter valid Id");
        }
        var result = await _todoService.Delete(id);
        return Ok(result);
    }
}
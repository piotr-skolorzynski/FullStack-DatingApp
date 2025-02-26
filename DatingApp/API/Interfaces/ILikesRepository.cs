using API.DTOs;
using API.Helpers;
using API.Models;

namespace API.Interfaces;

public interface ILikesRepository
{
    //opcjonalny gdyby nie było polubień
    Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>> GetUserLikes(LikesParams likesParams);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChanges();
}
